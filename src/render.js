import marked from 'marked'
import Prism from 'prismjs'
import * as tpl from './tpl'
import { activeLink, scrollActiveSidebar, bindToggle } from './event'
import { genTree, getRoute } from './util'

let OPTIONS = {}

const renderTo = function (dom, content) {
  dom = typeof dom === 'object' ? dom : document.querySelector(dom)
  dom.innerHTML = content

  return dom
}
let toc = []
const renderer = new marked.Renderer()

/**
 * render anchor tag
 * @link https://github.com/chjj/marked#overriding-renderer-methods
 */
renderer.heading = function (text, level) {
  const slug = text.toLowerCase().replace(/<(?:.|\n)*?>/gm, '').replace(/[^\w|\u4e00-\u9fa5]+/g, '-')
  let route = ''

  if (OPTIONS.router) {
    route = `#/${getRoute()}`
  }

  toc.push({ level, slug: `${route}#${slug}`, title: text })

  return `<h${level} id="${slug}"><a href="${route}#${slug}" class="anchor"></a>${text}</h${level}>`
}
// highlight code
renderer.code = function (code, lang = '') {
  const hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)

  return `<pre data-lang="${lang}"><code class="lang-${lang}">${hl}</code></pre>`
}
renderer.link = function (href, title, text) {
  if (OPTIONS.router && !/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(href)) {
    href = !/^\/#/.test(href) ? `#${href}` : href
  }

  return `<a href="${href}" title="${title || ''}">${text}</a>`
}
marked.setOptions({ renderer })

/**
 * App
 */
export function renderApp (dom, replace) {
  const nav = document.querySelector('nav') || document.createElement('nav')

  dom[replace ? 'outerHTML' : 'innerHTML'] = tpl.toggle(OPTIONS.sidebarToggle) + tpl.corner(OPTIONS.repo) + tpl.main()
  document.body.insertBefore(nav, document.body.children[0])

  // bind toggle
  bindToggle('button.sidebar-toggle')
}

/**
 * article
 */
export function renderArticle (content) {
  renderTo('article', content ? marked(content) : 'not found')
  if (!renderSidebar.rendered) renderSidebar(null, OPTIONS)
  if (!renderNavbar.rendered) renderNavbar(null, OPTIONS)
  renderSidebar.rendered = false
  renderNavbar.rendered = false
}

/**
 * navbar
 */
export function renderNavbar (content) {
  renderNavbar.rendered = true

  if (content) renderTo('nav', marked(content))
  activeLink('nav')
}

/**
 * sidebar
 */
export function renderSidebar (content) {
  renderSidebar.rendered = true

  let isToc = false

  if (content) {
    content = marked(content)
  } else if (OPTIONS.sidebar) {
    content = tpl.tree(OPTIONS.sidebar, '<ul>')
  } else {
    content = tpl.tree(genTree(toc, OPTIONS.maxLevel), '<ul>')
    isToc = true
  }

  renderTo('aside.sidebar', content)
  isToc ? scrollActiveSidebar() : activeLink('aside.sidebar', true)
  toc = []
}

export function config (options) {
  OPTIONS = options
}
