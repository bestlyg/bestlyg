set nocompatible  " 不与vi兼容
set nu            " 设置行号 number
set cul           " 突出显示当前行 cursorline
set cuc           " 突出显示当前列 cursorcolumn
set showmatch     " 显示括号匹配
set showmode      " 在底部显示模式
set hlsearch      " 搜索高亮
set showcmd       " 显示输入的命令
set autoindent    " 自动缩进，按下回车后，下一行会自动根上一行的缩进保持一致
set smartindent   " 智能缩进
set ruler         " 在状态栏显示光标当前位置，哪一行哪一列
set expandtab     " tab自动转空格
set ts=4          " 设置缩进4 tabstop
set shiftwidth=4  " 设置自动缩进4
set softtabstop=4 " 插入的是空格和tab制表符的混合



call plug#begin('~/.vim/plugged')
Plug 'leafgarland/typescript-vim'
call plug#end()

" vim安装Typescript语法高亮
" 下载vim-plug
"   curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
" 下载ts的plugin
"   git clone https://github.com/leafgarland/typescript-vim.git ~/.vim/bundle/typescript-vim
" ~/.vimrc
"   call plug#begin('~/.vim/plugged')
"   Plug 'leafgarland/typescript-vim'
"   call plug#end()