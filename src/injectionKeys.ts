import type { InjectionKey } from "vue";
import { User } from "@/types/User";

export const userInjectionKey = Symbol() as InjectionKey<User>;
