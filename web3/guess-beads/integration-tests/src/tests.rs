use near_units::parse_near;
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

    let result = alice
        .call(contract.id(), "init")
        .args_json(json!({"owner_id":"bestlyg.testnet"}))
        .transact()
        .await;
    assert!(result.is_ok());

    deposit_account(&account, &contract).await?;
    withdraw_account_balance(&account, &contract).await?;

    Ok(())
}

async fn deposit_account(user: &Account, contract: &Contract) -> anyhow::Result<()> {
    let _ = user
        .call(contract.id(), "deposit_account_balance")
        .deposit(POINT_ONE * 5)
        .transact()
        .await?;
    let _ = user
        .call(contract.id(), "deposit_account_balance")
        .deposit(POINT_ONE * 10)
        .transact()
        .await?;

    let res = user
        .call(contract.id(), "get_account_balance")
        .transact()
        .await?
        .raw_bytes();
    assert!(res.is_ok());
    let res = res.unwrap();
    let balance = String::from_utf8(res[1..res.len() - 1].to_vec()).unwrap();
    assert!(balance == (POINT_ONE * 15).to_string());
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
    let res = res.unwrap();
    let balance = String::from_utf8(res[1..res.len() - 1].to_vec()).unwrap();
    assert!(balance == (POINT_ONE * (15 - 7)).to_string());
    Ok(())
}
