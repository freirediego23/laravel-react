<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'usuario' => fake()->userName(),
            'idpersona' => fake() ->numberBetween(1,8),
            'idrol' => fake() ->numberBetween(1,8),
            'clave' => fake()->country(),
            'habilitado' => fake()->name(),
            'fecha' => fake()->date(),
            'fechacreacion' => fake()->date(),
            'fechamodificacion' => fake()->date(),
            'usuariocreacion' => fake()->date(),
            'usuariomodificacion' => fake()->date(),
        ];
    }
}