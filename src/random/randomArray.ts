/**
 * 随机打乱数组
 * @param array any[]
 * @returns array
 */
export function randomArray(array: any[]) {
  // 从最后一个元素开始，依次将当前元素和之前的某个随机位置上的元素交换
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // 随机生成一个介于 0 和 i 之间的整数
    ;[array[i], array[j]] = [array[j], array[i]] // 交换当前元素和随机位置上的元素
  }
  return array
}

// console.log(randomArray([1, 2, 3, 4, 5]))
