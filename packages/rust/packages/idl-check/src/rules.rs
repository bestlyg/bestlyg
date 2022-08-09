use std::{
    collections::{HashMap, HashSet},
    fmt::Error,
};

use protobuf::descriptor::FileDescriptorProto;

lazy_static! {
    static ref RULES: Vec<fn(&HashSet<String>, &FileDescriptorProto) -> Result<(), String>> = vec![
        rule_service_method_one_parameter,
        rule_service_method_input_should_be_struct,
        rule_service_method_output_should_be_struct
    ];
}

pub fn check(message_set: &HashSet<String>, f: &FileDescriptorProto) -> Result<(), Vec<String>> {
    let err_list: Vec<String> = RULES
        .iter()
        .map(|rule| rule(message_set, f))
        .filter(|res| if let Err(_) = res { true } else { false })
        .map(|res| res.unwrap_err())
        .collect();
    if err_list.len() == 0 {
        Ok(())
    } else {
        Err(err_list)
    }
}

fn rule_service_method_one_parameter(
    message_set: &HashSet<String>,
    f: &FileDescriptorProto,
) -> Result<(), String> {
    //only one parameter is allowed for the function "${funcName}"std
    if f.service.len() == 0 {
        Ok(())
    } else {
        for s in f.service.iter() {
            for m in s.method.iter() {
                if let None = m.input_type {
                    return Err(format!(
                        "only one parameter is allowed for the function {0}{1}{0} std",
                        '"',
                        m.name(),
                    ));
                }
            }
        }
        Ok(())
    }
}

fn rule_service_method_input_should_be_struct(
    message_set: &HashSet<String>,
    f: &FileDescriptorProto,
) -> Result<(), String> {
    // the type of the parameter "${requestTypeName}" of the function "${funcName}" should be "Struct"!
    if f.service.len() == 0 {
        Ok(())
    } else {
        for s in f.service.iter() {
            for m in s.method.iter() {
                if m.input_type.is_some() {
                    let name = crate::utils::get_message_name(m.input_type.as_ref().unwrap());
                    if !message_set.contains(&name) {
                        return Err(format!(
                            "the type of the parameter {0}{2}{0} of the function {0}{1}{0} should be {0}Struct{0}!",
                            '"',
                            m.name(),
                            name,
                        ));
                    }
                }
            }
        }
        Ok(())
    }
}

fn rule_service_method_output_should_be_struct(
    message_set: &HashSet<String>,
    f: &FileDescriptorProto,
) -> Result<(), String> {
    // the type of the parameter "${requestTypeName}" of the function "${funcName}" should be "Struct"!
    if f.service.len() == 0 {
        Ok(())
    } else {
        for s in f.service.iter() {
            for m in s.method.iter() {
                if m.output_type.is_some() {
                    let name = crate::utils::get_message_name(m.output_type.as_ref().unwrap());
                    if !message_set.contains(&name) {
                        return Err(format!(
                            "the return type of the function {0}{1}{0} should be {0}Struct{0}!",
                            '"',
                            m.name(),
                        ));
                    }
                }
            }
        }
        Ok(())
    }
}



#[cfg(debug_assertions)]
pub const IS_DEBUG: bool = true;
#[cfg(not(debug_assertions))]
pub const IS_DEBUG: bool = false;
