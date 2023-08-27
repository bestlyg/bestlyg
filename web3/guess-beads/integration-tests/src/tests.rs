use near_units::parse_near;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::{env, fs};
use workspaces::{types::Balance, Account, AccountId, Contract};

pub const POINT_ONE: Balance = 100_000_000_000_000_000_000_000;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let wasm_arg: &str = &(env::args().nth(1).unwrap());
    println!("arg {wasm_arg}");
    let wasm_filepath = fs::canonicalize(env::current_dir()?.join(wasm_arg))?;

    let worker = workspaces::sandbox().await?;
    let wasm = std::fs::read(wasm_filepath)?;
    let contract = worker.dev_deploy(&wasm).await?;
    // create accounts
    let account = worker.dev_create_account().await?;
    let alice = account
        .create_subaccount("alice")
        .initial_balance(parse_near!("30 N"))
        .transact()
        .await?
        .into_result()?;
    // create contract
    let result = alice
        .call(contract.id(), "init")
        .args_json(json!({"owner_id":"bestlyg.testnet"}))
        .transact()
        .await;
    assert!(result.is_ok());
    // test
    deposit_account(&account, &contract, 10).await?;
    withdraw_account_balance(&account, &contract).await?;
    withdraw_account_balance_all(&account, &contract).await?;
    guess_beads_error(&account, &contract).await?;
    deposit_account(&account, &contract, 30).await?;
    for _ in 0..10 {
        guess_beads(&account, &contract).await?;
    }
    Ok(())
}

async fn get_account_balance(user: &Account, contract: &Contract) -> anyhow::Result<String> {
    let res = user
        .call(contract.id(), "get_account_balance")
        .transact()
        .await?
        .raw_bytes();
    assert!(res.is_ok());
    let res = res.unwrap();
    let balance = String::from_utf8(res[1..res.len() - 1].to_vec()).unwrap();
    Ok(balance)
}

async fn check_balance_from_contract(
    user: &Account,
    contract: &Contract,
    target: String,
) -> anyhow::Result<()> {
    let balance = get_account_balance(user, contract).await?;
    assert!(balance == target);
    Ok(())
}

async fn deposit_account(
    user: &Account,
    contract: &Contract,
    amount: Balance,
) -> anyhow::Result<()> {
    let _ = user
        .call(contract.id(), "deposit_account_balance")
        .deposit(POINT_ONE * amount)
        .transact()
        .await?;
    check_balance_from_contract(user, contract, (POINT_ONE * amount).to_string()).await?;
    Ok(())
}

async fn withdraw_account_balance(user: &Account, contract: &Contract) -> anyhow::Result<()> {
    let res = user
        .call(contract.id(), "withdraw_account_balance")
        .args_json(json!({"balance": (POINT_ONE * 7).to_string()}))
        .transact()
        .await?
        .raw_bytes();
    assert!(res.is_ok());
    check_balance_from_contract(user, contract, (POINT_ONE * 3).to_string()).await?;
    Ok(())
}

async fn withdraw_account_balance_all(user: &Account, contract: &Contract) -> anyhow::Result<()> {
    let res = user
        .call(contract.id(), "withdraw_account_balance_all")
        .transact()
        .await?
        .raw_bytes();
    assert!(res.is_ok());
    check_balance_from_contract(user, contract, (POINT_ONE * 0).to_string()).await?;
    Ok(())
}

// Guess Beads

async fn guess_beads_error(user: &Account, contract: &Contract) -> anyhow::Result<()> {
    let res = user
        .call(contract.id(), "guess_beads")
        .transact()
        .await?
        .into_result();
    assert!(res.is_err());
    Ok(())
}

#[derive(Deserialize, Serialize, Clone, Debug, Copy)]
enum BeadType {
    Red,
    Green,
    Blue,
}
#[derive(Deserialize, Serialize, Clone, Debug)]
struct GuessBeadsResult {
    pick_list: Vec<BeadType>,
    benefits: String,
    balance: String,
}

fn get_benefits(list: &[BeadType]) -> i32 {
    let mut result_list = [0, 0, 0];
    for ty in list {
        result_list[*ty as usize] += 1;
    }
    result_list.sort();
    match result_list {
        [0, 4, 8] => 100,
        [1, 3, 8] | [2, 2, 8] => 30,
        [0, 5, 7] | [0, 6, 6] => 50,
        [1, 4, 7] | [2, 3, 7] => 20,
        [1, 5, 6] | [2, 4, 6] | [3, 3, 6] | [2, 5, 5] | [4, 4, 4] => 2,
        [3, 4, 5] => -1,
        _ => 0,
    }
}

async fn guess_beads(user: &Account, contract: &Contract) -> anyhow::Result<()> {
    let res = user
        .call(contract.id(), "guess_beads")
        .transact()
        .await?
        .json::<GuessBeadsResult>();
    assert!(res.is_ok());
    let guess_result = res.unwrap();
    if get_benefits(&guess_result.pick_list).to_string() != guess_result.benefits {
        println!(
            "gr = {guess_result:#?}, get = {}",
            get_benefits(&guess_result.pick_list)
        );
    }
    assert!(get_benefits(&guess_result.pick_list).to_string() == guess_result.benefits);
    Ok(())
}
