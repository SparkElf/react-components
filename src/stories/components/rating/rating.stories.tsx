import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Rating } from "../../../components/rating/rating"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Rating/Base',
    component: Rating,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Rating>
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Rating> = (args) => <Rating {...args} />;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({})

