<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $class = Classes::all();

        return Inertia::render('Dashboard/Class/Index', ['classes' => $class]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Class/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'from' => 'required',
            'to' => 'required',
        ]);

        Classes::create([
            'name' => $request->name,
            'description' => $request->description,
            'from' => $request->from,
            'to'=> $request->to
        ]);

        return to_route('dashboard.classes.index')->with('success', 'Class successfully created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Classes $assetClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $class = Classes::find($id);

        return Inertia::render('Dashboard/Class/Edit', ['classData' => $class]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'from' => 'required',
            'to' => 'required',
        ]);

        Classes::find($id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'from' => $request->from,
            'to'=> $request->to
        ]);

        return to_route('dashboard.classes.index')->with('success', 'Class successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Classes::find($id)->delete();

        return to_route('dashboard.classes.index')->with('success', 'Class successfully deleted.');
    }
}