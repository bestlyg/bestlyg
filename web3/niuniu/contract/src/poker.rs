use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env,
    serde::{Deserialize, Serialize},
    store::Vector,
    PanicOnDefault,
};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
pub enum Suit {
    // 红桃
    Heart,
    // 黑桃
    Spade,
    // 梅花
    Club,
    // 方块
    Diamond,
}

pub const SUIT_LIST: [Suit; 4] = [Suit::Heart, Suit::Spade, Suit::Club, Suit::Diamond];

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
pub enum Number {
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
}
pub const NUMBER_LIST: [Number; 13] = [
    Number::Two,
    Number::Three,
    Number::Four,
    Number::Five,
    Number::Six,
    Number::Seven,
    Number::Eight,
    Number::Nine,
    Number::Ten,
    Number::Jack,
    Number::Queen,
    Number::King,
    Number::Ace,
];

// #[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
// pub enum Joker {
//     Red,
//     Black,
// }

// pub const JOKER_LIST: [Joker; 2] = [Joker::Black, Joker::Red];

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
pub struct PlayingCard {
    suit: Suit,
    number: Number,
}

impl PlayingCard {
    fn new(suit: Suit, number: Number) -> Self {
        Self { suit, number }
    }
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Poker(Vector<PlayingCard>);

#[derive(Deserialize, Serialize, PanicOnDefault)]
pub struct PokerInfo(Vec<PlayingCard>);

impl Into<PokerInfo> for &Poker {
    fn into(self) -> PokerInfo {
        PokerInfo(
            self.0
                .into_iter()
                .map(|card| card.clone())
                .collect::<Vec<PlayingCard>>(),
        )
    }
}

impl Poker {
    pub fn get(&self, idx: u32) -> PlayingCard {
        self.0[idx].clone()
    }
    pub fn get_poker_vec() -> Vec<PlayingCard> {
        let mut poker = vec![];
        for suit in SUIT_LIST {
            for number in NUMBER_LIST {
                let card = PlayingCard::new(suit.clone(), number.clone());
                poker.push(card);
            }
        }
        poker
    }
    pub fn get_random_poker() -> Self {
        let mut vec = Self::get_poker_vec();
        vec.sort_by(|_, _| {
            let random = env::random_seed();
            random[0].cmp(&random[1])
        });
        let mut list = Vector::new(b'p');
        for card in vec {
            list.push(card);
        }
        Self(list)
    }
}
