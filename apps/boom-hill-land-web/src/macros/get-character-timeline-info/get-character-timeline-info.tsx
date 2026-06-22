import {
  CHARACTER_ANIMATIONS,
  type CharacterAnimation,
} from "../../consts/characters/character-animation.consts";
import {
  CHARACTER_TARGETS,
  type CharacterTarget,
} from "../../consts/characters/character-target.consts";
import { getBazziRunningPrepareTimelineInfo } from "./_characters/bazzi/get-bazzi-idle-running-prepare-timeline-info";
import { getBazziIdleTimelineInfo } from "./_characters/bazzi/get-bazzi-idle-timeline-info";
import { getBazziThrowBallonTimelineInfo } from "./_characters/bazzi/get-bazzi-throw-ballon-timeline-info";
import { getDaoRunningPrepareTimelineInfo } from "./_characters/dao/get-dao-idle-running-prepare-timeline-info";
import { getDaoIdleTimelineInfo } from "./_characters/dao/get-dao-idle-timeline-info";
import { getDaoThrowBallonTimelineInfo } from "./_characters/dao/get-dao-throw-ballon-timeline-info";
import { getDizniRunningPrepareTimelineInfo } from "./_characters/dizni/get-dizni-idle-running-prepare-timeline-info";
import { getDizniIdleTimelineInfo } from "./_characters/dizni/get-dizni-idle-timeline-info";
import { getDizniThrowBallonTimelineInfo } from "./_characters/dizni/get-dizni-throw-ballon-timeline-info";
import { getEddiRunningPrepareTimelineInfo } from "./_characters/eddi/get-eddi-idle-running-prepare-timeline-info";
import { getEddiIdleTimelineInfo } from "./_characters/eddi/get-eddi-idle-timeline-info";
import { getEddiThrowBallonTimelineInfo } from "./_characters/eddi/get-eddi-throw-ballon-timeline-info";
import { getKepiRunningPrepareTimelineInfo } from "./_characters/kepi/get-kepi-idle-running-prepare-timeline-info";
import { getKepiIdleTimelineInfo } from "./_characters/kepi/get-kepi-idle-timeline-info";
import { getKepiThrowBallonTimelineInfo } from "./_characters/kepi/get-kepi-throw-ballon-timeline-info";
import { getMaridRunningPrepareTimelineInfo } from "./_characters/marid/get-marid-idle-running-prepare-timeline-info";
import { getMaridIdleTimelineInfo } from "./_characters/marid/get-marid-idle-timeline-info";
import { getMaridThrowBallonTimelineInfo } from "./_characters/marid/get-marid-throw-ballon-timeline-info";
import { getMosRunningPrepareTimelineInfo } from "./_characters/mos/get-mos-idle-running-prepare-timeline-info";
import { getMosIdleTimelineInfo } from "./_characters/mos/get-mos-idle-timeline-info";
import { getMosThrowBallonTimelineInfo } from "./_characters/mos/get-mos-throw-ballon-timeline-info";
import { getUniRunningPrepareTimelineInfo } from "./_characters/uni/get-uni-idle-running-prepare-timeline-info";
import { getUniIdleTimelineInfo } from "./_characters/uni/get-uni-idle-timeline-info";
import { getUniThrowBallonTimelineInfo } from "./_characters/uni/get-uni-throw-ballon-timeline-info";

export function getCharacterTimelineInfo(props: {
  target: CharacterTarget;
  animation: CharacterAnimation;
  isRandomSpeed?: boolean;
}) {
  const { target, animation, isRandomSpeed = false } = props;

  switch (target) {
    case CHARACTER_TARGETS.DAO: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getDaoIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getDaoThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getDaoRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.BAZZI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getBazziIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getBazziThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getBazziRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.DIZNI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getDizniIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getDizniThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getDizniRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.EDDI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getEddiIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getEddiThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getEddiRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.KEPI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getKepiIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getKepiThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getKepiRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.MARID: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getMaridIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getMaridThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getMaridRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.MOS: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getMosIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getMosThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getMosRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
    case CHARACTER_TARGETS.UNI: {
      switch (animation) {
        case CHARACTER_ANIMATIONS.IDLE: {
          return getUniIdleTimelineInfo();
        }
        case CHARACTER_ANIMATIONS.THROW_BALLON: {
          return getUniThrowBallonTimelineInfo({ isRandomSpeed });
        }
        case CHARACTER_ANIMATIONS.RUNNING_PREPARE: {
          return getUniRunningPrepareTimelineInfo();
        }
        default: {
          throw new Error(`Invalid animation: ${animation}`);
        }
      }
    }
  }
}
