<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pagina>
 */
class PaginaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fechacreacion' => fake()->date(),
            'fechamodificacion' => fake()->date(),
            'usuariocreacion' => fake()->date(),
            'usuariomodificacion' => fake()->date(),
            'url' => fake()->url(),
            'estado' => fake()->country(),
            'nombre' => fake()->company(),
            'descripcion' => fake()->address(),
            'icono' => fake()->city(),
            'tipo' => fake()->phoneNumber(),
        ];
    }
}