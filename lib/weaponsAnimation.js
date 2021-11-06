const japaneseChars = '悪魔モンスター絶望悲しみ愛する平和エントピ'

export default async (weapons, weapon) => {
  const currentIndex = weapons.indexOf(weapon.value)
  const nextIndex =
    currentIndex + 1 !== weapons.length ? currentIndex + 1 : 0
  const nextWeapon = weapons[nextIndex]
  const longerWordLength =
    nextWeapon.length >= weapon.value.length
      ? nextWeapon.length
      : weapon.value.length

  await weaponToJapanese(weapon)

  await japaneseToWeapon(weapon, nextWeapon, longerWordLength)
}

async function weaponToJapanese(weapon) {
  const randomIndexes = getRandomIndexes(weapon.value.length)
  for (const index of randomIndexes) {
    const randomJapaneseIndex = Math.floor(
      Math.random() * (japaneseChars.length - 0 + 1) + 0
    )
    weapon.value = replaceChar(
      weapon.value.split(''),
      index,
      japaneseChars[randomJapaneseIndex]
    )

    await timeOut(50)
  }
}

async function japaneseToWeapon(weapon, nextWeapon, longerWordLength) {
  const randomIndexes = getRandomIndexes(longerWordLength)
  const spaces =
    nextWeapon.length && nextWeapon.length > weapon.value.length
      ? Array(nextWeapon.length - weapon.value.length)
        .fill(' ')
        .join('')
      : ''
  const wordReference = weapon.value.concat(spaces).split('')

  for (const index of randomIndexes) {
    weapon.value = replaceChar(wordReference, index, nextWeapon[index])

    await timeOut(50)
  }
}

function getRandomIndexes(length) {
  return [...Array(length).keys()].sort(() =>
    Math.random() > 0.5 ? 1 : -1
  )
}

function replaceChar(word, index, char) {
  word[index] = char || ''

  return word.join('')
}

function timeOut(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}