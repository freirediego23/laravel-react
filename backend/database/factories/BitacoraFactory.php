<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bitacora>
 */
class BitacoraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'bitacora' => fake()->jobTitle(),
            'idusuario' => fake() ->numberBetween(1,8),
            'fecha' => fake()->date(),
            'hora' => fake()->date(),
            'ip' => fake()->address(),
            'so' => fake()->city(),
            'navegador' => fake()->country(),
            'usuario' => fake()->userName(),
        ];
    }
}