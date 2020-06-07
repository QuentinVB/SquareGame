module Grid exposing (main)

import Browser
import Http

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode exposing (Decoder, field, string, int)
import Array exposing (Array)
import String exposing (String)
import Json.Encode exposing (int)

import CustomDecoder exposing(..)

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

-- INIT

init : () -> (Model, Cmd Msg)
init _ = 
    ( Loading
    , Http.get
        { url = "http://localhost:3000/createGrid/5"
        , expect = Http.expectJson GotJson gameDecoder
        }
    )

-- UPDATE
type Msg
  = GotJson (Result Http.Error String)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
     GotJson result ->
      case result of
          Ok fullText ->
            Debug.log(Debug.toString fullText)
            (Success fullText , Cmd.none)
          Err _ ->
            Debug.log(Debug.toString result)
            (Failure "Error during get json", Cmd.none)


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

-- VIEW

view : Model -> Html Msg
view model =
  case model of
    Failure errorMessage ->
      pre [] [ text errorMessage ]
    
    Loading ->
      text "Loading..."

    Success dataText ->
      pre [] [ text dataText ]



jsontestDecoder : Decoder String
jsontestDecoder =
  field "methode" string


