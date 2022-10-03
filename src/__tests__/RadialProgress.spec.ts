import { mount } from "@vue/test-utils";
import RadialProgress from "../RadialProgress.vue";

describe("RadialProgress.vue", () => {
  function mountFunction(options = {}) {
    return mount(RadialProgress, { ...options });
  }

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
