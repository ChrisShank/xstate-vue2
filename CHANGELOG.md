# @xstate/vue

## 0.3.0

### Breaking changes

- Remove `@vue/compsition-api` peer dependency. Add `vue@^2.7.0` as peer dependency.

## 0.2.1

- Fix `useMachine` by accessing `service.initialState` so spawned actors work

## 0.2.0

- Add `useSelector` composable
- Add `useSpawn` composable
- Add support for `getSnapshot` in `useActor`
- Deprecate `useService`

### BREAKING CHANGES

- Bump `xstate` peer dep to `^4.20.0`
- Bump `@vue/composition-api` to `^1.0.0`

## 0.1.1

- Fix build

## 0.1.0

- Port over package from `@xstate/vue`.
