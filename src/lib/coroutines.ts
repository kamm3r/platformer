

export async function* Coroutine<T>(some: T) {
    const nextThing = some
    do {
        const dude = nextThing
        yield* dude
    } while (nextThing)

}