import { z } from "zod"

export const PokemonSchema = z.object({
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  abilities: z.array(z.object({ ability: z.object({ name: z.string() }) })),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })),
  sprites: z.object({ front_default: z.string().nullable() }),
})
