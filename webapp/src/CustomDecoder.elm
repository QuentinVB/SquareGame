module CustomDecoder exposing (..)

import Json.Decode as JD exposing (..)
import Models exposing (..)

boxDecoder : Decoder Box
boxDecoder =
    JD.map5 Box
    (field "state" int)
    (field "top" int)
    (field "bottom" int)
    (field "left" int)
    (field "right" int)

edgeDecoder : Decoder Edge
edgeDecoder =
    JD.map Edge
    (field "state" int)

boxesDecoder : Decoder (List Box)
boxesDecoder =
    JD.list boxDecoder

edgesDecoder : Decoder (List Edge)
edgesDecoder =
    JD.list edgeDecoder

gameDecoder : Decoder Game
gameDecoder =
    JD.map2 Game
    (field "boxes" boxesDecoder)
    (field "edges" edgesDecoder)