module JsonCall exposing (main)

import Browser
import Http

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode exposing (Decoder, field, string)



-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type Model
  = Failure String
  | Loading
  | Success String


init : () -> (Model, Cmd Msg)
init _ =
  (Loading, getTimeStamp)



-- UPDATE


type Msg
  = RefreshTime
  | GotTime (Result Http.Error String)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    RefreshTime ->
      (Loading, getTimeStamp)

    GotTime result ->
      case result of
        Ok timestamp ->
            (Success timestamp, Cmd.none)

        Err _ ->
          (Failure "prout", Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h2 [] [ text "Actual timestamp" ]
    , viewTime model
    ]


viewTime : Model -> Html Msg
viewTime model =
  case model of
    Failure foo ->
      div []
        [ text ("Nope !" ++ foo)
        , button [ onClick RefreshTime ] [ text "Try Again!" ]
        ]

    Loading ->
      text "Loading..."

    Success timestamp ->
      div []
        [ button [ onClick RefreshTime, style "display" "block" ] [ text "More Please!" ]
        , p [] [ text timestamp ] 
        ]



-- HTTP

getTimeStamp : Cmd Msg
getTimeStamp =
    let
        headers =
            [ 
            ]
    in
    Http.request 
        { method = "GET"
        , headers = headers
        , url = "http://localhost:3000/time"
        , body = Http.emptyBody
        , expect = Http.expectJson GotTime timeDecoder
        , timeout = Nothing
        , tracker = Nothing
        }  


timeDecoder : Decoder String
timeDecoder =
  field "timestamp" string