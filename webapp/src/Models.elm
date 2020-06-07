module Models exposing (Game, Player, Box, Edge)

type alias Game =
    { boxes : List Box
    , edges : List Edge
    }

type alias Player =
  { name : String
  , score : Int 
  }

type alias Box =
  { state : Int
  , top : Int
  , bottom : Int
  , left : Int
  , right : Int
  }
type alias Edge
    = { state : Int }

nullGame : Game
nullGame = { boxes= [], edges = [] }