import createAlignmentPlugin from '@draft-js-plugins/alignment';

export const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

export default function ImageToolBar() {
    return (
        <AlignmentTool />
    )
}