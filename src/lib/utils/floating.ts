export type Side = "top" | "bottom" | "left" | "right";
export type Alignment = "start" | "end";
export type Placement = Side | `${Side}-${Alignment}`;

export type Rect = {
    top: number;
    left: number;
    width: number;
    height: number;
};

export type Size = {
    width: number;
    height: number;
};

export type Position = {
    top: number;
    left: number;
    side: Side;
};

const opposite: Record<Side, Side> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
};

const isVertical = (side: Side) => side === "top" || side === "bottom";

const mainStart = (
    side: Side,
    anchor: Rect,
    floating: Size,
    offset: number,
) => {
    switch (side) {
        case "top":
            return anchor.top - floating.height - offset;
        case "bottom":
            return anchor.top + anchor.height + offset;
        case "left":
            return anchor.left - floating.width - offset;
        case "right":
            return anchor.left + anchor.width + offset;
    }
};

const crossStart = (
    side: Side,
    align: Alignment | undefined,
    anchor: Rect,
    floating: Size,
) => {
    const anchorStart = isVertical(side) ? anchor.left : anchor.top;
    const anchorSize = isVertical(side) ? anchor.width : anchor.height;
    const floatingSize = isVertical(side) ? floating.width : floating.height;

    if (align === "start") {
        return anchorStart;
    }

    if (align === "end") {
        return anchorStart + anchorSize - floatingSize;
    }

    return anchorStart + (anchorSize - floatingSize) / 2;
};

const fits = (
    side: Side,
    anchor: Rect,
    floating: Size,
    viewport: Size,
    offset: number,
    padding: number,
) => {
    const start = mainStart(side, anchor, floating, offset);
    const size = isVertical(side) ? floating.height : floating.width;
    const limit = isVertical(side) ? viewport.height : viewport.width;

    return start >= padding && start + size <= limit - padding;
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), Math.max(min, max));

export const computePosition = (
    anchor: Rect,
    floating: Size,
    viewport: Size,
    placement: Placement = "bottom",
    offset = 6,
    padding = 8,
): Position => {
    const [requested, align] = placement.split("-") as [
        Side,
        Alignment | undefined,
    ];

    const side =
        fits(requested, anchor, floating, viewport, offset, padding) ||
        !fits(opposite[requested], anchor, floating, viewport, offset, padding)
            ? requested
            : opposite[requested];

    const main = mainStart(side, anchor, floating, offset);
    const cross = crossStart(side, align, anchor, floating);

    if (isVertical(side)) {
        return {
            top: main,
            left: clamp(
                cross,
                padding,
                viewport.width - floating.width - padding,
            ),
            side,
        };
    }

    return {
        top: clamp(cross, padding, viewport.height - floating.height - padding),
        left: main,
        side,
    };
};
