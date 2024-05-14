---
layout: "@/templates/BasePost.astro"
title: My Nvim Configuration - LSP
description: configure lsp (language server protocol) in nvim
keywords: nvim, lsp, mason, mason-lspconfig, dap, nvim-dap, lazyvim, lua-snippet
pubDate: 2024-05-14T12:00:00Z
imgSrc: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=4031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
imgAlt: "nvim power"
---

let's continue our configuration.

### Install LSP

<a href='https://github.com/Microsoft/language-server-protocol' target='_blank'>LSP</a> stands for `language server protocol`, which is started by `microsoft`, so we can do code auto-complete and check errors when write our code.

I use <a href='https://github.com/williamboman/mason.nvim' target='_blank'>Mason</a> and <a href='https://github.com/williamboman/mason-lspconfig.nvim' target='_blank'>Mason-lspconfig</a> + <a href='https://github.com/neovim/nvim-lspconfig' target='_blank'>Nvim-lspconfig</a> to do this.

/`mason` is auto installed within when you clone the configurations of lazy./

so create a file in `plugins` fold, maybe call it `lsp-config`.

talk is cheap, let me show you the code:

```
return {
  {
    "williamboman/mason.nvim",
    config = function()
      require("mason").setup({})
    end,
  },
  {
    "williamboman/mason-lspconfig.nvim",
    config = function()
      require("mason-lspconfig").setup({
        ensure_installed = { "lua_ls", "tsserver", "jsonls", "vale_ls", "tailwindcss" },
      })
    end,
  },
  {
    "neovim/nvim-lspconfig",
    config = function(_, opts)
      local lspconfig = require("lspconfig")
      lspconfig.dartls.setup({
        cmd = { "dart", "language-server", "--protocol=lsp" },
      })
      lspconfig.tsserver.setup({})
      lspconfig.lua_ls.setup({})
      lspconfig.tailwindcss.setup({})
      lspconfig.prismals.setup({})
      lspconfig.vale_ls.setup({}) -- for markdown
      lspconfig.jsonls.setup({})

      vim.keymap.set('n', 'K', vim.lsp.buf.hover, {})
      vim.keymap.set('n', 'gd', vim.lsp.buf.definition, {})
      vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action, {})
      vim.keymap.set('n', '<leader>ce', vim.diagnostic.open_float, {})
    end
  },
}

```

the code mainly does the things below:

1. set up mason
2. set ensure_installed lsp use mason-lspconfig
3. config lsp with nvim-lspconfig
4. set some shortcut for lsp

### I will continue in the next article
