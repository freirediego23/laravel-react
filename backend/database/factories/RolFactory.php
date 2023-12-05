<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rol>
 */
class RolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'rol' => fake()->jobTitle(),
            'fechacreacion' => fake()->date(),
            'fechamodificacion' => fake()->date(),
            'usuariocreacion' => fake()->date(),
            'usuariomodificacion' => fake()->date(),
        ];
    }
}