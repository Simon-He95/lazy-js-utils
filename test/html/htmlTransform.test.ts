import { describe, expect, it } from 'vitest'
import { htmlTransform } from '../../src/html'

describe('htmlTransform test', () => {
  it('test', async () => {
    const code = await htmlTransform(
      '<div class="_ee">hello</div><view bindtap="xx"></view>',
      {
        div(node, { setAttribs, beforeInsert, afterInsert }) {
          node.name = 'p'
          setAttribs('age', '19')
          beforeInsert('<span>hi</span>')
          afterInsert('<span>你好</span>')
        },
        '*': function (node) {
          // 所有的节点都会进入这里
          console.log(node)
        },
        '$attr$_ee': function (node) {
          // $attr开头会匹配存在_ee属性的节点
          console.log(node)
        },
        '$attr$bindtap': function (node, { renameAttribs }) {
          renameAttribs('bindtap', 'onTap')
        },
      },
    )
    expect(code).toMatchInlineSnapshot(
      `"<span>hi</span><p class="_ee" age="19">hello</p><span>你好</span><view onTap="xx"></view>"`,
    )
  })
})
