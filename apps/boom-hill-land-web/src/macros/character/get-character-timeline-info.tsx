import { CHARACTER_ANIMATIONS } from "../../consts/characters/character-animation.consts";
import { CHARACTER_TARGETS } from "../../consts/characters/character-target.consts";
import { getBazziFallDownTimelineInfo } from "./_characters/bazzi/get-bazzi-fall-down-timeline-info";
import { getBazziRunningPrepareTimelineInfo } from "./_characters/bazzi/get-bazzi-idle-running-prepare-timeline-info";
import { getBazziIdleTimelineInfo } from "./_characters/bazzi/get-bazzi-idle-timeline-info";
import { getBazziRunTimelineInfo } from "./_characters/bazzi/get-bazzi-run-timeline-info";
import { getBazziThrowBallonTimelineInfo } from "./_characters/bazzi/get-bazzi-throw-ballon-timeline-info";
import { getBazziWakeUpTimelineInfo } from "./_characters/bazzi/get-bazzi-wake-up-timeline-info";
import { getBazziWalkTimelineInfo } from "./_characters/bazzi/get-bazzi-walk-timeline-info";
import { getDaoFallDownTimelineInfo } from "./_characters/dao/get-dao-fall-down-timeline-info";
import { getDaoRunningPrepareTimelineInfo } from "./_characters/dao/get-dao-idle-running-prepare-timeline-info";
import { getDaoIdleTimelineInfo } from "./_characters/dao/get-dao-idle-timeline-info";
import { getDaoRunTimelineInfo } from "./_characters/dao/get-dao-run-timeline-info";
import { getDaoThrowBallonTimelineInfo } from "./_characters/dao/get-dao-throw-ballon-timeline-info";
import { getDaoWakeUpTimelineInfo } from "./_characters/dao/get-dao-wake-up-timeline-info";
import { getDaoWalkTimelineInfo } from "./_characters/dao/get-dao-walk-timeline-info";
import { getDizniFallDownTimelineInfo } from "./_characters/dizni/get-dizni-fall-down-timeline-info";
import { getDizniRunningPrepareTimelineInfo } from "./_characters/dizni/get-dizni-idle-running-prepare-timeline-info";
import { getDizniIdleTimelineInfo } from "./_characters/dizni/get-dizni-idle-timeline-info";
import { getDizniRunTimelineInfo } from "./_characters/dizni/get-dizni-run-timeline-info";
import { getDizniThrowBallonTimelineInfo } from "./_characters/dizni/get-dizni-throw-ballon-timeline-info";
import { getDizniWakeUpTimelineInfo } from "./_characters/dizni/get-dizni-wake-up-timeline-info";
import { getDizniWalkTimelineInfo } from "./_characters/dizni/get-dizni-walk-timeline-info";
import { getEddiFallDownTimelineInfo } from "./_characters/eddi/get-eddi-fall-down-timeline-info";
import { getEddiRunningPrepareTimelineInfo } from "./_characters/eddi/get-eddi-idle-running-prepare-timeline-info";
import { getEddiIdleTimelineInfo } from "./_characters/eddi/get-eddi-idle-timeline-info";
import { getEddiRunTimelineInfo } from "./_characters/eddi/get-eddi-run-timeline-info";
import { getEddiThrowBallonTimelineInfo } from "./_characters/eddi/get-eddi-throw-ballon-timeline-info";
import { getEddiWakeUpTimelineInfo } from "./_characters/eddi/get-eddi-wake-up-timeline-info";
import { getEddiWalkTimelineInfo } from "./_characters/eddi/get-eddi-walk-timeline-info";
import { getKepiFallDownTimelineInfo } from "./_characters/kepi/get-kepi-fall-down-timeline-info";
import { getKepiRunningPrepareTimelineInfo } from "./_characters/kepi/get-kepi-idle-running-prepare-timeline-info";
import { getKepiIdleTimelineInfo } from "./_characters/kepi/get-kepi-idle-timeline-info";
import { getKepiRunTimelineInfo } from "./_characters/kepi/get-kepi-run-timeline-info";
import { getKepiThrowBallonTimelineInfo } from "./_characters/kepi/get-kepi-throw-ballon-timeline-info";
import { getKepiWakeUpTimelineInfo } from "./_characters/kepi/get-kepi-wake-up-timeline-info";
import { getKepiWalkTimelineInfo } from "./_characters/kepi/get-kepi-walk-timeline-info";
import { getMaridFallDownTimelineInfo } from "./_characters/marid/get-marid-fall-down-timeline-info";
import { getMaridRunningPrepareTimelineInfo } from "./_characters/marid/get-marid-idle-running-prepare-timeline-info";
import { getMaridIdleTimelineInfo } from "./_characters/marid/get-marid-idle-timeline-info";
import { getMaridRunTimelineInfo } from "./_characters/marid/get-marid-run-timeline-info";
import { getMaridThrowBallonTimelineInfo } from "./_characters/marid/get-marid-throw-ballon-timeline-info";
import { getMaridWakeUpTimelineInfo } from "./_characters/marid/get-marid-wake-up-timeline-info";
import { getMaridWalkTimelineInfo } from "./_characters/marid/get-marid-walk-timeline-info";
import { getMosFallDownTimelineInfo } from "./_characters/mos/get-mos-fall-down-timeline-info";
import { getMosRunningPrepareTimelineInfo } from "./_characters/mos/get-mos-idle-running-prepare-timeline-info";
import { getMosIdleTimelineInfo } from "./_characters/mos/get-mos-idle-timeline-info";
import { getMosRunTimelineInfo } from "./_characters/mos/get-mos-run-timeline-info";
import { getMosThrowBallonTimelineInfo } from "./_characters/mos/get-mos-throw-ballon-timeline-info";
import { getMosWakeUpTimelineInfo } from "./_characters/mos/get-mos-wake-up-timeline-info";
import { getMosWalkTimelineInfo } from "./_characters/mos/get-mos-walk-timeline-info";
import { getUniFallDownTimelineInfo } from "./_characters/uni/get-uni-fall-down-timeline-info";
import { getUniRunningPrepareTimelineInfo } from "./_characters/uni/get-uni-idle-running-prepare-timeline-info";
import { getUniIdleTimelineInfo } from "./_characters/uni/get-uni-idle-timeline-info";
import { getUniRunTimelineInfo } from "./_characters/uni/get-uni-run-timeline-info";
import { getUniThrowBallonTimelineInfo } from "./_characters/uni/get-uni-throw-ballon-timeline-info";
import { getUniWakeUpTimelineInfo } from "./_characters/uni/get-uni-wake-up-timeline-info";
import { getUniWalkTimelineInfo } from "./_characters/uni/get-uni-walk-timeline-info";
import type { GetTimelineInfoProps } from "./_types";

export function getCharacterTimelineInfo(props: GetTimelineInfoProps) {
  const { target, animation } = props;
  switch (target) {
    case CHARACTER_TARGETS.DAO: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getDaoIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getDaoThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getDaoRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getDaoFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getDaoWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getDaoWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getDaoRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.BAZZI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getBazziIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getBazziThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getBazziRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getBazziFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getBazziWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getBazziWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getBazziRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.DIZNI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getDizniIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getDizniThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getDizniRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getDizniFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getDizniWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getDizniWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getDizniRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.EDDI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getEddiIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getEddiThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getEddiRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getEddiFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getEddiWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getEddiWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getEddiRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.KEPI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getKepiIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getKepiThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getKepiRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getKepiFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getKepiWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getKepiWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getKepiRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.MARID: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getMaridIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getMaridThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getMaridRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getMaridFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getMaridWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getMaridWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getMaridRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.MOS: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getMosIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getMosThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getMosRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getMosFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getMosWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getMosWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getMosRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.UNI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getUniIdleTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getUniThrowBallonTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getUniRunningPrepareTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.FALL_DOWN: {
          return getUniFallDownTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WAKE_UP: {
          return getUniWakeUpTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.WALK: {
          return getUniWalkTimelineInfo(props);
        }
        case CHARACTER_ANIMATIONS.RUN: {
          return getUniRunTimelineInfo(props);
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
  }
}
