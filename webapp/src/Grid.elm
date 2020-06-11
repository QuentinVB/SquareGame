module Grid exposing (..)

import Browser
import Http
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode exposing (..)

import Types.Box.Types exposing (..)
import Types.Box.Decoder exposing (..)
import Types.Game.Types exposing (..)


-- INTERNAL MODULES

main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }


-- MODEL

type alias Model =
  { gameId : String
  , boxes : Boxes
  , edges : Edges
  , error : String
  , gameState : String
  }

init : () -> (Model, Cmd Msg)
init _ = 
  ( createModel "-1", Cmd.none )

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

type Msg
  = GetBoard(Result Http.Error Model)
  | GetBoxes(Result Http.Error Boxes)
  | NewGame

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of

    NewGame ->
      ( createModel "-1" , getGrid )

    GetBoxes result ->
      case result of
        Ok boxes ->
          Debug.log("success")
          ( updateBoxes model boxes , Cmd.none  )
        Err _ ->
          Debug.log("failed")
          ( addErrorModel model "Can not find board" , Cmd.none )

    GetBoard result ->
      case result of
        Ok board ->
          Debug.log("success")
          ( updateBoard model board , Cmd.none  )
        Err _ ->
          Debug.log("failed")
          ( addErrorModel model "Can not find board" , Cmd.none )


createModel : String -> Model
createModel gameID =
  { gameId = gameID
  , boxes = nullBoxes
  , edges = nullEdges
  , error = ""
  , gameState = "-1"
  }

getGrid : Cmd Msg
getGrid =
  Http.get
  { url = "http://localhost:3000/new/torung"
  , expect = Http.expectJson GetBoard gridDecoder }

gridDecoder : Decoder Model
gridDecoder =
  ( field "game" getBoardDecoder )

getBoardDecoder : Decoder Model
getBoardDecoder =
  map5 Model
    (field "gameId" string)
    (field "boxes" boxesDecoder)
    (field "edges" edgesDecoder)
    (field "error" string)
    (field "gameState" string)

updateBoard : Model -> Model -> Model
updateBoard model newBoard =
  Debug.log("grid")
  { gameId = newBoard.gameId
  , boxes = newBoard.boxes
  , edges = newBoard.edges
  , error = newBoard.error
  , gameState = newBoard.gameState
  }


getBoxesDecoder : Decoder Boxes
getBoxesDecoder =
  ( field "game" ( field "boxes" boxesDecoder ) )

updateBoxes : Model -> Boxes -> Model
updateBoxes model newBoxes =
  { gameId = model.gameId
  , boxes = newBoxes
  , edges = model.edges
  , error = model.error
  , gameState = model.gameState
  }

-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ h2 [] [ text "New game" ]
    , viewTime model
    ]


viewTime : Model -> Html Msg
viewTime model =
    div [ ]
    [ div [class "error"] [text model.error]
    , div [class "message"] [text ("Game id: " ++ model.gameId)]
    , button  [ class "button"
              , onClick NewGame ] [text "New Game" ]
    ]

addErrorModel: Model -> String -> Model
addErrorModel model err = 
  { gameId = model.gameId
  , boxes = model.boxes
  , edges = model.edges
  , error = err
  , gameState = model.gameState}