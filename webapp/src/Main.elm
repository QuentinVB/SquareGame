module Main exposing (main)

import Browser
import State exposing (init, update, subscriptions)
import Types exposing (Model, Msg)
import View exposing (..)

main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }