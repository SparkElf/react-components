import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Loading } from "../../../components/loading/loading-cycle"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Loading/Circle',
    component: Loading,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Loading>
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Circle = Template.bind({})

