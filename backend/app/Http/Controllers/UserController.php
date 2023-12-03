<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
     // Display a listing of the resource.
     public function index()
     {
         $users = User::all();
         //return response()->json(['user' => $users]);
         return $users;
     }
 
     // Show the form for creating a new resource.
     public function create()
     {
         return view('users.create');
     }
 
     // Store a newly created resource in storage.
     public function store(Request $request)
     {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_BCRYPT);
        $saved = $user->save();
        return $saved . "User created";

         // Validate the request data
        //  $validatedData = $request->validate([
        //      'name' => 'required|string|max:255',
        //      'email' => 'required|email|unique:users|max:255',
        //      'password' => 'required|string|min:8',
        //  ]);
 
         // Create a new user
        //  $user = User::create($validatedData);
 
        //  return redirect()->route('users.index')->with('success', 'User created successfully.');
     }
 
     // Display the specified resource.
     public function show(User $user)
     {
         return view('users.show', compact('user'));
     }
 
     // Show the form for editing the specified resource.
     public function edit(Request $request, $id)
     {

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_BCRYPT);
        $saved = $user->save();
        return $saved . "User updated";

         //return view('users.edit', compact('user'));
     }
 
     // Update the specified resource in storage.
     public function update(Request $request, $id)
     {
         // Validate the request data
        //  $validatedData = $request->validate([
        //      'name' => 'required|string|max:255',
        //      'email' => 'required|email|unique:users,email,'.$user->id.'|max:255',
        //      'password' => 'nullable|string|min:8',
        //  ]);
 
        //  // Update user
        //  $user->update($validatedData);
 
        //  return redirect()->route('users.index')->with('success', 'User updated successfully.');

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_BCRYPT);
        $saved = $user->save();
        return $saved . "User updated";
     }
 
     // Remove the specified resource from storage.
     public function destroy($id)
     {
        $user= User::findOrFail($id);
         $user->delete();
 
        //  return redirect()->route('users.index')->with('success', 'User deleted successfully.');
        return 'User deleted';
     }
}