<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            // new Middleware('permission:permissions-data', only: ['index']),
            // new Middleware('permission:permissions-create', only: ['create', 'store']),
            // new Middleware('permission:permissions-update', only: ['edit', 'update']),
            // new Middleware('permission:permissions-delete', only: ['destroy']),
            
            // new Middleware(\Spatie\Permission\Middleware\PermissionMiddleware::using('permission'), only:['index', 'create', 'store', 'edit', 'update', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //  get permissions
        $permissions = Permission::all();

        // render view
        return Inertia::render('Dashboard/Permissions/Index', ['permissions' => $permissions]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // render view
        return Inertia::render('Dashboard/Permissions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions']);

        // create new permission data
        Permission::create(['name' => $request->name]);

        // render view
        return to_route('dashboard.permissions.index')->with('success','Successfully created permission');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        // render view
        return Inertia::render('Dashboard/Permissions/Edit', ['permission' => $permission]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions,name,'.$permission->id]);

        // update permission data
        $permission->update(['name' => $request->name]);

        // render view
        return to_route('dashboard.permissions.index')->with('success','Successfully updated permission');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        // delete permissions data
        $permission->delete();

        // render view
        return back()->with('success','Successfully deleted permission');
    }
}