import babyBear from '@/assets/tarot/baby_bear.png'
import godBear from '@/assets/tarot/god_bear.png'
import judgeBear from '@/assets/tarot/judge_bear.png'
import kidBear from '@/assets/tarot/kid_bear.png'
import masterBear from '@/assets/tarot/master_bear.png'
import mechaBear from '@/assets/tarot/mecha_bear.png'
import warriorBear from '@/assets/tarot/warrior_bear.png'

export const fishCount = 3200

export const GOM_LEVELS = [
  { min: 0, name: '아기 곰곰이', image: babyBear, desc: '아직 애기예요' },
  { min: 500, name: '꼬마 곰곰이', image: kidBear, desc: '이제 좀 낚시할 줄 알아요' },
  { min: 2000, name: '곰곰 워리어', image: warriorBear, desc: '사냥꾼 곰곰 등장!' },
  { min: 5000, name: '곰곰 마스터', image: masterBear, desc: '전설의 시작' },
  { min: 10000, name: '곰신', image: godBear, desc: '곰신 강림' },
]

export const SPECIAL_CARDS = [
  {
    name: '심사위원 곰',
    image: judgeBear,
    desc: '아이디어를 심사할 수 있는 공정한 곰곰이예요. 채택 여부를 결정하는 중요한 역할을 맡고 있어요!',
  },
  {
    name: '시스템 관리자 곰',
    image: mechaBear,
    desc: '곰곰세상을 관리하는 시스템 관리자 곰이에요. 서버, 데이터, 규칙을 모두 지키고 있어요!',
  },
]
