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
        Schema::create('enlaces', function (Blueprint $table) {
            $table->id('idenlace');
            $table->unsignedBigInteger('idpagina');
            $table->unsignedBigInteger('idrol');
            $table->string('descripcion');
            $table->date('fechacreacion');
            $table->date('fechamodificacion');
            $table->date('usuariocreacion');
            $table->date('usuariomodificacion');
            $table->foreign('idpagina')->references('idpagina')->on('paginas')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('idrol')->references('idrol')->on('rols')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('enlaces');
    }
};