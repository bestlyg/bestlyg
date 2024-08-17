set nocompatible                        " 不与vi兼容                                                                                                                                                                             
set nu                                  " 设置行号 number
set cul                                 " 突出显示当前行 cursorline
set cuc                                 " 突出显示当前列 cursorcolumn
set showmatch                           " 显示括号匹配
set showmode                            " 在底部显示模式
set hlsearch                            " 搜索高亮
set showcmd                             " 显示输入的命令
set autoindent                          " 自动缩进，按下回车后，下一行会自动根上一行的缩进保持一致
set smartindent                         " 智能缩进
set ruler                               " 在状态栏显示光标当前位置，哪一行哪一列
set expandtab                           " tab自动转空格
set ts=4                                " 设置缩进4 tabstop
set shiftwidth=4                        " 设置自动缩进4
set softtabstop=4                       " 插入的是空格和tab制表符的混合
set noerrorbells                        " 出错时，别发声
set visualbell                          " 出错时，屏幕闪烁
set autoread                            " 打开文件监视
set wildmenu
 
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
Plug 'rust-lang/rust.vim'
Plug 'prabirshrestha/vim-lsp'
Plug 'mattn/vim-lsp-settings'

call plug#end()