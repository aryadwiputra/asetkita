<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Dashboard/Categories/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:categories',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'slug'=> \Illuminate\Support\Str::slug($request->name),
        ]);

        return to_route('dashboard.categories.index')->with('success','Successfully created category');
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
    public function edit(string $id)
    {
        $category = Category::find($id);

        return Inertia::render('Dashboard/Categories/Edit', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|min:3|max:255',
        ]);

        $category = Category::find($id);

        $category->update([
            'name' => $request->name,
            'slug'=> \Illuminate\Support\Str::slug($request->name),
        ]);

        return to_route('dashboard.categories.index')->with('success','Successfully updated category');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);

        $category->delete();

        return to_route('dashboard.categories.index')->with('success','Successfully deleted category');
    }
}
