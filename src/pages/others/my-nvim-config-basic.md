---
layout: "@/templates/BasePost.astro"
title: My Nvim Configuration - basic
description: a blog to record my nvim setting with explains
keywords: nvim, lsp, mason, mason-lspconfig, dap, nvim-dap, lazyvim, lua-snippet
pubDate: 2024-05-14T00:00:00Z
imgSrc: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=4031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
imgAlt: "nvim power"
---

### Summary

I used `vscode` to code before, but I found if there's an update but you don't want to do it, `vscode` will do wired things for you, like some functions not work properly, so I decide to change to `vim`, it's not a decision by foot, some of my jobs is to configure some server environment, so I'm familiar with `vim`.

After some search, I found a youtube called <a href="https://www.youtube.com/@typecraft_dev" target="_blank"> typecraft</a>, his video is pretty good for `vim-beginners`, so I learnt from him mostly of the configuration.

### Basic

As mentioned above, I learnt from `typecraft`, he used <a href='https://neovim.io/' target='_blank'>neovim </a> + <a href="https://www.lazyvim.org/" target="_blank">lazyvim</a>, so I also used these two. (believe me, I also tried other like `vim` + `vim-plug`, but I found `lazyvim` is real easy for laziers).

so, the first thing is to install `neo vim`, I use a mac, so I use `brew` to do this:

```
brew install neovim
```

then get the configuration from `lazyvim` github and clone into `~/.config/nvim`:

```
git clone https://github.com/LazyVim/starter ~/.config/nvim

rm -rf ~/.config/nvim/.git
```

if you open `~/.config/nvim`, you will find it has a structure like this:

- init.lua
- lazyvim.json
- lua
  - config
  - plugins

the `init.lua` is the index file of this configuration, `neo vim` will read this file to load it's configs.

in `config` fold, there're some default configurations from `lazyvim`.

mostly of our operations are in `plugins` fold.

### Treesitter

`Tree-sitter` is a parser generator tool and an incremental parsing library. It can build a concrete syntax tree for a source file and efficiently update the syntax tree as the source file is edited.

I use <a href='https://github.com/nvim-treesitter/nvim-treesitter' target='_blank'>Nvim-treesitter</a> to do this.

below is my configurations, the most important I think is `auto_install = true`, the file is also under `plugins` folder and called `treesitter.lua`.

```
return {
  "nvim-treesitter/nvim-treesitter",
  config = function()
    local treesitter_config = require("nvim-treesitter.configs")
    treesitter_config.setup({
      ensure_installed = { "c", "lua", "vim", "vimdoc", "query" },
      sync_install = false,
      auto_install = true,
      ignore_install = { "javascript" },

      highlight = {
        enable = true,

        disable = function(lang, buf)
          local max_filesize = 100 * 1024 -- 100 KB
          local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
          if ok and stats and stats.size > max_filesize then
            return true
          end
        end,

        additional_vim_regex_highlighting = false,
      },
    })
  end

}

```

### I will continue in the next article
