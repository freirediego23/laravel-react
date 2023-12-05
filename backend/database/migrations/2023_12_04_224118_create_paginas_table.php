<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paginas', function (Blueprint $table) {
            $table->id('idpagina');
            $table->date('fechacreacion');
            $table->date('fechamodificacion');
            $table->date('usuariocreacion');
            $table->date('usuariomodificacion');
            $table->string('url');
            $table->string('estado');
            $table->string('nombre');
            $table->string('descripcion');
            $table->string('icono');
            $table->string('tipo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paginas');
    }
};