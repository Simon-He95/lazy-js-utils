import { describe, expect, it } from 'vitest'
import { parseLrc } from '../../src/string/parseLrc'
import lrc from './parseLrc.lrc?raw'

describe('parseLrc test', () => {
  it('test', async () => {
    expect(parseLrc(lrc)).toMatchInlineSnapshot(`
      [
        {
          "time": 0,
          "words": "LRC-toomic.com",
        },
        {
          "time": 0,
          "words": "稻香 (2015中国好声音第四季现场) - 周杰伦/徐林/Will Jay",
        },
        {
          "time": 5,
          "words": "词：周杰伦",
        },
        {
          "time": 6,
          "words": "曲：周杰伦",
        },
        {
          "time": 22,
          "words": "对这个世界如果你有太多的抱怨",
        },
        {
          "time": 25,
          "words": "跌倒了就不敢继续往前走",
        },
        {
          "time": 28,
          "words": "为什么人要这么的脆弱堕落",
        },
        {
          "time": 32,
          "words": "请你打开电视看看",
        },
        {
          "time": 33,
          "words": "多少人为生命在努力勇敢的走下去",
        },
        {
          "time": 37,
          "words": "我们是不是该知足",
        },
        {
          "time": 39,
          "words": "珍惜一切就算没有拥有",
        },
        {
          "time": 44,
          "words": "还记得你说家是唯一的城堡",
        },
        {
          "time": 47,
          "words": "随着稻香河流继续奔跑",
        },
        {
          "time": 50,
          "words": "微微笑小时候的梦我知道",
        },
        {
          "time": 55,
          "words": "不要哭让萤火虫带着你逃跑",
        },
        {
          "time": 59,
          "words": "乡间的歌谣永远的依靠",
        },
        {
          "time": 61,
          "words": "回家吧回到最初的美好",
        },
        {
          "time": 89,
          "words": "不要这么容易就想放弃",
        },
        {
          "time": 91,
          "words": "就像我说的",
        },
        {
          "time": 93,
          "words": "追不到的梦想换个梦不就得了",
        },
        {
          "time": 96,
          "words": "为自己的人生鲜艳上色",
        },
        {
          "time": 98,
          "words": "先把爱涂上喜欢的颜色",
        },
        {
          "time": 100,
          "words": "笑一个吧功成名就不是目的",
        },
        {
          "time": 103,
          "words": "让自己快乐快乐这才叫做意义",
        },
        {
          "time": 106,
          "words": "童年的纸飞机",
        },
        {
          "time": 108,
          "words": "现在终于飞回我手里",
        },
        {
          "time": 112,
          "words": "所谓的那快乐",
        },
        {
          "time": 113,
          "words": "赤脚在田里追蜻蜓追到累了",
        },
        {
          "time": 116,
          "words": "偷摘水果被蜜蜂给叮到怕了",
        },
        {
          "time": 119,
          "words": "谁在偷笑呢",
        },
        {
          "time": 120,
          "words": "我靠着稻草人吹着风唱着歌睡着了",
        },
        {
          "time": 124,
          "words": "哦哦哦哦",
        },
        {
          "time": 130,
          "words": "珍惜一切就算没有拥有",
        },
        {
          "time": 134,
          "words": "还记得你说家是唯一的城堡",
        },
        {
          "time": 138,
          "words": "随着稻香河流继续奔跑",
        },
        {
          "time": 141,
          "words": "微微笑小时候的梦我知道",
        },
        {
          "time": 146,
          "words": "不要哭让萤火虫带着你逃跑",
        },
        {
          "time": 149,
          "words": "乡间的歌谣永远的依靠",
        },
        {
          "time": 152,
          "words": "回家吧回到最初的美好",
        },
        {
          "time": 157,
          "words": "还记得你说家是唯一的城堡",
        },
        {
          "time": 160,
          "words": "随着稻香河流继续奔跑",
        },
        {
          "time": 163,
          "words": "微微笑小时候的梦我知道",
        },
        {
          "time": 168,
          "words": "不要哭让萤火虫带着你逃跑",
        },
        {
          "time": 172,
          "words": "乡间的歌谣永远的依靠",
        },
        {
          "time": 174,
          "words": "回家吧回到最初的美好",
        },
      ]
    `)
  })
})
