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
 
syntax enable     " 开启语法高亮
filetype on       " 开启文件类型侦测
 
set background=dark
colorscheme gruvbox
 
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>
 
call plug#begin('~/.vim/plugged')
 
Plug 'preservim/nerdtree'

Plug 'pangloss/vim-javascript'    " JavaScript support
Plug 'leafgarland/typescript-vim' " TypeScript syntax
Plug 'maxmellon/vim-jsx-pretty'   " JS and JSX syntax
Plug 'jparise/vim-graphql'        " GraphQL syntax
Plug 'neoclide/coc.nvim', {'branch': 'release'}

call plug#end()


" 下载vim-plug
"   curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
" 下载ts的plugin
"   git clone https://github.com/leafgarland/typescript-vim.git ~/.vim/pack/typescript/start/typescript-vim
" 下载配色
"   git clone https://github.com/altercation/vim-colors-solarized.git  ~/.vim/bundle/vim-colors-solarized
" ~/.vimrc
"   call plug#begin('~/.vim/plugged')
"   Plug 'leafgarland/typescript-vim'
"   call plug#end()

" typescript-vim
" https://github.com/leafgarland/typescript-vim
" git clone https://github.com/leafgarland/typescript-vim.git ~/.vim/pack/typescript/start/typescript-vim

" vim-javascript
" https://github.com/pangloss/vim-javascript
" git clone https://github.com/pangloss/vim-javascript.git ~/.vim/pack/vim-javascript/start/vim-javascript

" vim-jsx-pretty
" https://github.com/MaxMEllon/vim-jsx-pretty
" git clone https://github.com/MaxMEllon/vim-jsx-pretty.git ~/.vim/pack/vim-jsx-pretty/start/vim-jsx-pretty

" git clone https://github.com/preservim/nerdtree.git ~/.vim/pack/vendor/start/nerdtree
" vim -u NONE -c "helptags ~/.vim/pack/vendor/start/nerdtree/doc" -c q