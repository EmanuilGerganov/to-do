import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Task from "../Task.vue";

describe("Task", () => {
  it("renders properly", () => {
    const wrapper = mount(Task, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
