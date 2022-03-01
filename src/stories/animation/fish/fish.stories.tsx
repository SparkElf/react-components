import { ComponentMeta, ComponentStory } from "@storybook/react"
import { FishAnimation } from "../../../components/fish-animation/fish-animation"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Animation',
    component: FishAnimation,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FishAnimation>
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FishAnimation> = (args) => <FishAnimation {...args} />;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const fish = Template.bind({})

