module State exposing(..)

import Types exposing (..)
import Types.Box.Types exposing (..)
import Types.Box.Decoder exposing (..)
import Json.Decode exposing (..)
import Http

init : () -> (Model, Cmd Msg)
init _ = 
  ( createModel "-1", Cmd.none )

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of

    NewGame ->
      ( createModel "-1" , getGrid )

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

addErrorModel: Model -> String -> Model
addErrorModel model err = 
  { gameId = model.gameId
  , boxes = model.boxes
  , edges = model.edges
  , error = err
  , gameState = model.gameState}