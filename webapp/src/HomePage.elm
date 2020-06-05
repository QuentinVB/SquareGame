module HomePage exposing (main)

import Browser
import Http
import Json.Decode exposing (Decoder, field, string)

import Html exposing (Html, button, div, p,text)
import Html.Events exposing (onClick)
import Result exposing (Result)

--http://127.0.0.1:3000/time


-- MODEL

type alias Model = String

init : Model
init =
  ""


-- UPDATE
type Msg = UpdateData

update : Msg -> Model -> Model
update msg model =
  case msg of
    UpdateData ->
      Debug.log "update"
      model getTimestamp



type RestResponse
  = GotText (Result Http.Error String)

getTimestamp : Cmd RestResponse
getTimestamp =
  Http.get
    { 
      url = "http://127.0.0.1:3000/time"
    , expect = Http.expectJson GotText
    }

-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ 
      p [] [ text "baka" ]
    ,  button [ onClick UpdateData ] [ text "Update" ]
    , div [] [ text model ]
    ]

-- MAIN
main =
  Browser.sandbox 
  { init = init
  , update = update
  , view = view 
  }
