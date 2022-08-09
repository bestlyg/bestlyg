use std::Rc;

struct Player {
    right: Rc<Player>,
    left: Rc<Player>,
    oppo: Rc<Player>,
}
