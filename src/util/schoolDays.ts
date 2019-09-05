/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Block } from "./blocks/block";
import { BlockColor } from "./blocks/blockColor";
import { SchoolDay } from "./calendar/types";

type SchoolDaysBlockColorsMap = {
    readonly [D in keyof typeof Block]: {
        [B in keyof typeof SchoolDay]: BlockColor;
    }
};

// tslint:disable: object-literal-sort-keys
const MapOfBlocksToColor: SchoolDaysBlockColorsMap = {
    A: {
        // TODO: LAB BLOCKS
        One: BlockColor.None,
        Two: BlockColor.None,
        Three: BlockColor.None,
        Four: BlockColor.None,
        Five: BlockColor.None,
        Six: BlockColor.None,
        Seven: BlockColor.None
    },
    B: {
        One: BlockColor.Orange,
        Two: BlockColor.Yellow,
        Three: BlockColor.Green,
        Four: BlockColor.Tan,
        Five: BlockColor.Red,
        Six: BlockColor.Purple,
        Seven: BlockColor.Blue
    },
    C: {
        One: BlockColor.Yellow,
        Two: BlockColor.Orange,
        Three: BlockColor.Orange,
        Four: BlockColor.Yellow,
        Five: BlockColor.Orange,
        Six: BlockColor.Orange,
        Seven: BlockColor.Yellow
    },
    D: {
        One: BlockColor.Green,
        Two: BlockColor.Tan,
        Three: BlockColor.Tan,
        Four: BlockColor.Green,
        Five: BlockColor.Yellow,
        Six: BlockColor.Green,
        Seven: BlockColor.Green
    },
    E: {
        One: BlockColor.Red,
        Two: BlockColor.Red,
        Three: BlockColor.Purple,
        Four: BlockColor.Red,
        Five: BlockColor.Purple,
        Six: BlockColor.Tan,
        Seven: BlockColor.Tan
    },
    F: {
        One: BlockColor.Blue,
        Two: BlockColor.Purple,
        Three: BlockColor.Blue,
        Four: BlockColor.Blue,
        Five: BlockColor.Blue,
        Six: BlockColor.Red,
        Seven: BlockColor.Purple
    }
};
// tslint:enable: object-literal-sort-keys

export function getBlockColorsForDay(day: keyof typeof SchoolDay): {
    [B in keyof typeof Block]: BlockColor
} {
    return {
        A: MapOfBlocksToColor.A[day],
        B: MapOfBlocksToColor.B[day],
        C: MapOfBlocksToColor.C[day],
        D: MapOfBlocksToColor.D[day],
        E: MapOfBlocksToColor.E[day],
        F: MapOfBlocksToColor.F[day]
    };
}