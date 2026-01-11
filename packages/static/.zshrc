# antigen zsh plugin
source /opt/homebrew/share/antigen/antigen.zsh
antigen use oh-my-zsh
antigen bundle git
antigen bundle jeffreytse/zsh-vi-mode
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-completions
antigen bundle zsh-users/zsh-history-substring-search
HISTORY_SUBSTRING_SEARCH_ENSURE_UNIQUE=1
bindkey -M vicmd 'k' history-substring-search-up
bindkey -M vicmd 'j' history-substring-search-down
antigen theme robbyrussell
antigen apply

# homebrew
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/
export PYTHON_BUILD_MIRROR_URL="https://registry.npmmirror.com/-/binary/python"

# pgsql
export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"
# java
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.0.1.jdk/Contents/Home
# go
export PATH="$HOME/go/bin:$PATH"

# rust
. "$HOME/.cargo/env"

# python
. "$HOME/.local/bin/env" # uv
# export PATH="$HOME/.pyenv/shims:$PATH"

# custom
alias proxy-start="export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890"
alias proxy-end="export https_proxy= http_proxy= all_proxy="
alias ioa='sudo ifconfig en0 down && sudo ifconfig en1 down && sudo ifconfig en2 down && sudo ifconfig en0 up && sudo ifconfig en1 up && sudo ifconfig en2 up'
gsync() {
    git fetch origin $1:$1
}

# 覆盖原有的mac内置的c系列工具
alias gcc='gcc-15'
alias g++='g++-15'
alias cc='gcc-15'
export PATH="/opt/homebrew/opt/llvm/bin:$PATH"

