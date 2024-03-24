import lightning0 from "@/assets/lightning_bolt_yellow.png"
import lightning1 from "@/assets/lightning_bolt_yellow_1.png"
import lightning2 from "@/assets/lightning_bolt_yellow_2.png"
import lightning3 from "@/assets/lightning_bolt_yellow_3.png"
import lightning4 from "@/assets/lightning_bolt_yellow_4.png"
import lightning5 from "@/assets/lightning_bolt_yellow_5.png"
import lightning6 from "@/assets/lightning_bolt_yellow_6.png"
import lightning7 from "@/assets/lightning_bolt_yellow_7.png"
import lightning8 from "@/assets/lightning_bolt_yellow_8.png"
import lightning9 from "@/assets/lightning_bolt_yellow_9.png"
import lightning10 from "@/assets/lightning_bolt_yellow_rocket.png"

export default function getEnergySymbol(energy: number | null){
  switch (energy) {
    case null : return lightning0
    case 0    : return lightning0
    case 1    : return lightning1
    case 2    : return lightning2
    case 3    : return lightning3
    case 4    : return lightning4
    case 5    : return lightning5
    case 6    : return lightning6
    case 7    : return lightning7
    case 8    : return lightning8
    case 9    : return lightning9
    case 10   : return lightning10
  }
}

