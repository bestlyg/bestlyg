use std::cell::{RefCell, RefMut};

/// hooks

type Hook = fn();
pub struct Hooks {
    on_load_list: RefCell<Vec<Hook>>,
    on_unload_list: RefCell<Vec<Hook>>,
}

impl Hooks {
    pub fn new() -> Self {
        Hooks {
            on_load_list: RefCell::new(Vec::new()),
            on_unload_list: RefCell::new(Vec::new()),
        }
    }
    fn call_hook(&self, list: &Vec<Hook>) {
        list.iter().for_each(|f| f());
    }
    pub fn on_load(&self) {
        self.call_hook(&self.on_load_list.borrow());
    }
    pub fn on_unload(&self) {
        self.call_hook(&self.on_unload_list.borrow());
    }
    fn add_hook(&self, list: &mut RefMut<Vec<Hook>>, hook: Hook) {
        list.push(hook);
    }
    pub fn add_on_load(&mut self, hook: Hook) {
        self.add_hook(&mut self.on_load_list.borrow_mut(), hook);
    }
    pub fn add_on_unload(&mut self, hook: Hook) {
        self.add_hook(&mut self.on_unload_list.borrow_mut(), hook);
    }
}
