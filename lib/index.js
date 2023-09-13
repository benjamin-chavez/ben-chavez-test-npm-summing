/**
 * @typedef {import('hast').Root} Root
 */

/**
 * @typedef Options
 *   Configuration (optional).
 */

import {visit} from 'unist-util-visit'

/** @type {Options} */
const emptyOptions = {}

const REMARK_CODE_TITLE_TAG_NAME = 'CodeBlockTitle'

//@ts-ignore
export default function attachMetadataProperties(options) {
  const settings = options || emptyOptions

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, (node) => {
      // if (node?.type === 'element' && node?.tagName === 'CodeBlockTitle') {
      if (
        node?.type === 'element' &&
        node?.tagName === REMARK_CODE_TITLE_TAG_NAME
      ) {
        node.properties['__withmeta__'] = //@ts-ignore
          (node.children.at(0).tagName === 'div').toString()

        //@ts-ignore
        node.properties['__rawstring__'] = node.__rawstring__
      } else if (node?.type === 'element' && node?.tagName === 'div') {
        if (!('data-rehype-pretty-code-fragment' in node.properties)) {
          return
        }

        const preElement = node.children.at(-1)

        //@ts-ignore
        if (preElement?.tagName !== 'pre') {
          return
        }
        //@ts-ignore
        preElement.properties['__withmeta__'] = //@ts-ignore
          (node.children.at(0).tagName === 'div').toString()
        //@ts-ignore
        preElement.properties['__rawstring__'] = node.__rawstring__
      }
    })
  }
}

module.exports = isBmc
