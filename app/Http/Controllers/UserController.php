<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return Inertia::render("Dashboard/Users/Index", ["users"=> $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // get roles
        $roles = Role::where('name', '!=', 'super-admin')->get();
        return Inertia::render("Dashboard/Users/Create", ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name"=> "required",
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'selectedRoles' => 'required|array|min:1',
        ]);

        $user = User::create([
            "name"=> $request->name,
            "email"=> $request->email,
            "password"=> bcrypt($request->password),
        ]);

        // attach roles
        $user->assignRole($request->selectedRoles);

        return redirect()->route("dashboard.users.index")->with("success","Successfully created user");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // get roles
        $roles = Role::where('name', '!=', 'super-admin')->get();

        // load roles
        $user->load('roles');

        // render view
        return inertia('Dashboard/Users/Edit', ['user' => $user, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "name"=> "required",
            "email" => "required|email|unique:users,email,".$id,
            "password" => "nullable|string|min:8|confirmed",
            'selectedRoles' => 'required|array|min:1',
        ]);

        // If has password, update password
        $user = User::find($id);

        if($request->password){
            $user->update([
                "name"=> $request->name,
                "email"=> $request->email,
                "password"=> bcrypt($request->password),
            ]);
        }else{
            $user->update([
                "name"=> $request->name,
                "email"=> $request->email,
            ]);
        }

        $user->syncRoles($request->selectedRoles);

        return redirect()->route("dashboard.users.index")->with("success","Successfully updated user");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if(Auth::user()->id != $user->id){
            $user->delete();
            
            return redirect()->route("dashboard.users.index")->with("success","Successfully deleted user");
        }else{
            return redirect()->route("dashboard.users.index")->with("error","You cannot delete yourself");
        }
    }
}
