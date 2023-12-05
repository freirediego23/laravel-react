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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('idusuario');
            $table->unsignedBigInteger('idpersona')->nullable();
            $table->string('usuario');
            $table->string('clave');
            $table->string('habilitado');
            $table->date('fecha');
            $table->unsignedBigInteger('idrol')->nullable();
            $table->date('fechacreacion');
            $table->date('fechamodificacion');
            $table->date('usuariocreacion');
            $table->date('usuariomodificacion');
            $table->foreign('idrol')->references('idrol')->on('rols')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('idpersona')->references('idpersona')->on('personas')->onUpdate('cascade')->onDelete('cascade');

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
        Schema::dropIfExists('usuarios');
    }
};